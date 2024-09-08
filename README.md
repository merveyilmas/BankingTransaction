# Banking Project

Proje genel olarak kullanıcının banka hesap işlemlerini gerçekleştirebilmesini sağlar.

## Özellikler
İlk olarak kullanıcıyı giriş ekranı karşılar. Buradan kullanıcı kayıt işlemi gerçekleştirebilir veya uygulamaya giriş yapabilirsiniz. Giriş yaptıktan sonra kullanıcıyı anasayfa karşılar.

Projede genel olarak 3 bölüm vardır. Bunlar 'Accounts', 'Money Transfers' ve 'Transaction History' bölümleridir.

Accounts bölümünden kullanıcı kendi hesaplarını görüntüler. Hesaplar arası arama, yeni hesap oluşturma, hesap bilgileri güncelleme ve hesap silme işlemlerini bu bölümde gerçekleştirebilir.

Money Transfers bölümünde ise kullanıcı seçtiği hesabından hesap numarasını bildiği başka bir hesaba para transferi gerçekleştirebilir.

Transaction History bölümünden ise kullanıcı seçtiği hesabına ait başarılı veya başarısız transfer bilgilerine ulaşabilir.

## Teknolojiler
* Projenin backend kısmında `Spring Boot` teknolojisi kullanılmıştır.
* Projenin frontend kısmında `React` teknolojisi kullanılmıştır.
* Projede `Java 21` versiyonu kullanılmıştır.
* Projede `MySql` veritabanı kullanılmıştır.

## Kurulum
İlk olarak tüm proje dosyalarını indiriniz.
- git clone [https://github.com/merveyilmas/N11BootcampFinalProject.git](https://github.com/merveyilmas/OreDataAssignment.git)
1. Backend proje kurulum;
    - Sisteminizde Java21, MySql veritabanı kurulu olduğundan emin olunuz.
    - İndirdiğiniz proje dosyaları içerisinde BankingTransactionService backend projesini idenizde (ör. IntellijIdea) açınız.
    - resources/ dizini altındaki Application.properties dosyasından kendi veritabanı bilgilerini güncelleyiniz.
    - Ardından idenizde projeyi çalıştırabilirsiniz.
2.  Frontend proje kurulum;
   - Sisteminizde Node.js kurulu olduğundan emin olunuz.
   - İndirdiğiniz proje dosyaları içerisinde BankingTransactionFrontend frontend projesini idenizde (ör. VsCode) açınız.
   - Ide'nizin terminal ekranını açınız. İlk olarak 'npm install' komutu ile proje bağımlılıklarınızı yükleyiniz.
   - Ardından proje klasörünüzün dizininde 'npm start' ile projenizi çalıştırabilirsiniz.

## Kullanım
Oluşturduğum "swagger docs" klasöründe projenin apilerine ulaşabilirsiniz. 
[Bu linke](https://drive.google.com/file/d/1l8ojWyygxOSZ9cgfM5i6eNv9YEiBwUcZ/view?usp=sharing) tıklayarak proje kullanım dökümanına ulaşabilirsiniz.

## Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasını inceleyiniz.
