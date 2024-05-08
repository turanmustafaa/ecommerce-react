describe('Header Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('updates search term when input changes', () => {
      const searchTerm = 'test';
      cy.get('input[type="text"]').type(searchTerm).should('have.value', searchTerm);
  
      cy.window().its('store').invoke('getState').then(state => {
        const filteredProducts = state.products.filteredProducts;
        const expectedFilteredProducts = state.products.products.filter(item =>
          item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
        expect(filteredProducts).to.deep.equal(expectedFilteredProducts);
      });
    });
  });
  