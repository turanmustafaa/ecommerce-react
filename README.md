# Etaration Frontend Case

Bu proje, iş başvurusu için geliştirilen bir case projesidir. Bu README dosyası, projenin genel yapısını, kullanılan teknolojiler ve projeyi çalıştırma adımlarını içerir.

## Kullanılan Teknolojiler

Bu projede aşağıdaki teknolojiler kullanılmıştır:

- ReactJs
- Redux-toolkit
- React-router-dom
- Axios
- TailwindCSS
- React Pagination
- React Toastify
- Cypress

# Projeyi Nasıl Geliştirdim

Bu proje,ReactJs ve ReduxToolkit kullanılarak geliştirilmiştir. Aşağıda projenin geliştirilme sürecinde kullanılan yöntemler ve teknolojiler hakkında detaylı bilgiler bulunmaktadır:

- Proje ReactJs ile geliştirildi.
- Projenin tum parçaları aktif olarak çalısmakta(sorting/ filtering/search filtering /localstorage products / total price etc. )
- Projeyi tekrar olçeklenebilir hale getirdim. Layout sistemini entegre ettim. Mimari değiştirmeden büyütülebilir ve esnek bir yapıya sahip. Farklı modallar, bileşenler vb. esnek bir şekilde entegre edilebilir ve tekrar kullanılabilir.
- Veri alışverişi işlemleri için Redux-toolkit ve props'lar kullanıldı.
- Redux yapısını moduler olarak kurdum. boylelikle olceklenebilir olarak bir başkası kodun uzerinden rahatlıkla devam edebilir. 
- Servis istekleri bir base_url ile api klasorunden atılıyor. buraya bir interceptor dahil edilebilirdi ancak gerek duymadım.
- İstekler için Axios kütüphanesi kullanıldı.
- Tum Style Islemleri TailwindCSS ile yapıldı. 
- Projenin tamamı Tailwind CSS ile yazıldı. sadece active class için custom css yazılmak durumunda kalındı. Zaman kazanmak amacıyla bu tercih yapıldı.
- Mobil'e uygun tasarlanmadı bu yuzden min 1280 px cihazlarda calistiriniz.
- projede Toast notification kullanıldı boylelikle daha iyi bir kullanıcı deneyimi sunuldu.


# Projede olan eksiklikler

- React Skelaton eklenerek productların yuklenmesi sırasında daha iyi bir kullanıcı deneyimi sunulabilirdi.
- Error Page eklenebilirdi.
- Reducers parçalara bolunebilirdi.
- api ve BASE_URL için .env kullanılması daha saglıklı olurdu. 
- proje Responsive olarak geliştirilebilirdi.

## Nasıl Çalıştırılır?

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Öncelikle, projeyi klonlayın veya zip olarak indirin:

```bash
git clone <proje-git-url>

npm install

npm run start
```
