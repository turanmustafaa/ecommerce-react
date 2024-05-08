describe('Pagination Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('renders pagination with correct page count', () => {
      const pageCount = 7; 
      let currentPage = 1;

      cy.get('.pagination').should('exist');

      cy.get('.pagination').contains('1').should('exist');
  
      for (let i = 2; i <= pageCount; i++) {
        cy.get('.pagination').contains(i.toString()).should('exist'); 
      }
      cy.get('.pagination').contains('1').click();
      currentPage = 0;
      for (let i = 2; i <= pageCount; i++) {
        cy.get('.pagination').contains(i.toString()).click();
        currentPage = i - 1;
      }
      cy.get('.pagination').contains((currentPage + 1).toString()).should('have.class', 'active');
    });
  });
  