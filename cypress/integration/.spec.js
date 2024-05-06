describe('E-Ticaret Uygulaması E2E Testleri', () => {
    it('Ürün ekleyip sepeti kontrol etme', () => {
      // Ana sayfayı ziyaret et
      cy.visit('/');
  
      // Arama kutusuna bir ürün adı yaz
      cy.get('input[type="text"]').type('Kalem');
  
      // Arama butonuna tıkla
      cy.get('button').contains('Search').click();
  
      // İlk ürünü seç ve sepete ekle
      cy.get('.product').first().contains('Add to Cart').click();
  
      // Sepet sayfasına git
      cy.contains('Cart').click();
  
      // Sepetteki ürünün adını kontrol et
      cy.contains('Kalem');
    });
  });
  