describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Juan Díaz',
      username: 'juand',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2020'
    );
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('juand');
    cy.get('#password').type('password');
    cy.get('#login-button').click();
    cy.contains('Juan Díaz logged in');
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // cy.contains('Wrong credentials');
    // cy.get('.error').contains('Wrong credentials');
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Juan Díaz logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'juand', password: 'password' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#new-note').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and several notes exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        // cy.contains('second note').contains('make important').click();
        // cy.contains('second note').contains('make no important');
        // cy.contains('second note').parent().find('button').click();
        // cy.contains('second note')
        //   .parent()
        //   .find('button')
        //   .should('contain', 'make no important');

        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make no important');
      });
    });
  });
});
