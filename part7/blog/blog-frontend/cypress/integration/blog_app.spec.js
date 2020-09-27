describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user1 = {
      name: 'Juan Díaz',
      username: 'juand',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user1);
    const user2 = {
      name: 'Fran Carrasco',
      username: 'franc',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('blogs');
    cy.contains('log in to application');
  });

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('juand');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();
      cy.get('.success')
        .should('contain', 'Welcome Juan Díaz')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('Juan Díaz is logged in');
    });

    it('Fails with wrong credentials', function () {
      cy.get('#username').type('juand');
      cy.get('#password').type('12345678');
      cy.get('#loginBtn').click();
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'juand', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Batman: Year One');
      cy.get('#author').type('Frank Miller');
      cy.get('#url').type('www.batmanzero.com');
      cy.get('#createBlogBtn').click();
      cy.contains('Batman: Year One | Frank Miller');
    });

    describe('when several blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Batman: Year One',
          author: 'Frank Miller',
          url: 'www.batmanzero.com',
        });
        cy.createBlog({
          title: 'I Robot',
          author: 'Isaac Asimov',
          url: 'asimov.sci',
        });
        cy.createBlog({
          title: 'Jurassic Park',
          author: 'Michael Crishton',
          url: 'www.jp.org',
        });
      });

      it('A user can like a blog', function () {
        cy.contains('I Robot').contains('view').click();
        cy.contains('I Robot').get('.blogInfo').get('.btnLikes').click();
        cy.contains('I Robot').get('.blogInfo').contains('likes: 1');
      });

      it('blog are aordered by most likes', function () {
        cy.contains('Jurassic Park').contains('view').click();
        cy.contains('Jurassic Park').get('.blogInfo').get('.btnLikes').click();
        cy.wait(1000);
        cy.contains('Jurassic Park').get('.blogInfo').get('.btnLikes').click();

        cy.contains('Batman').contains('view').click();
        cy.contains('Batman')
          .get('.blogInfo')
          .get('.btnLikes')
          .click({ multiple: true });

        cy.contains('I Robot').contains('view').click();

        cy.get('.blog').then((blog) => {
          cy.wrap(blog[0]).contains('likes: 2');
          cy.wrap(blog[1]).contains('likes: 1');
          cy.wrap(blog[2]).contains('likes: 0');
        });
      });
    });

    describe('when a user create a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Batman: Year One',
          author: 'Frank Miller',
          url: 'www.batmanzero.com',
        });
      });

      it('can delete his own blog', function () {
        cy.contains('Batman').contains('view').click();
        cy.contains('Batman').get('.blogInfo').get('.btnDelete').click();
        cy.get('.success').should('contain', 'removed ok');
        cy.should('not.contain', 'Batman');
      });
    });
  });

  describe('when a user create some blog', function () {
    beforeEach(function () {
      cy.login({ username: 'juand', password: 'password' });
      cy.createBlog({
        title: 'Batman: Year One',
        author: 'Frank Miller',
        url: 'www.batmanzero.com',
      });
      cy.cleanLocalStorage();
      cy.login({ username: 'franc', password: 'password' });
    });

    it('another user cant delete someone else blog', function () {
      cy.contains('Batman').contains('view').click();
      cy.contains('Batman').get('.blogInfo').get('.btnDelete').click();
      cy.get('.error').should('contain', 'only owner can delete this blog');
      cy.contains('Batman');
    });
  });
});
