# Cookify - Yemek Tarifi Uygulaması

Cookify, kullanıcılara mevcut malzemelere göre yemek tarifleri öneren, kullanıcıların tariflerini paylaşabildiği ve çeşitli özelliklerle zenginleştirilmiş bir yemek tarif uygulamasıdır. Uygulama, yemeklerin fotoğraflarını paylaşma, tarifler üzerinde yorum yapma, kullanıcı takip etme gibi birçok özellik sunmaktadır.

## Özellikler

- **Malzemelere Göre Yemek Önerisi**: Kullanıcılar, dolaplarındaki malzemelere göre yemek tarifleri alabilir.
- **Tarif Paylaşımı ve Yorumlar**: Kullanıcılar kendi tariflerini paylaşabilir ve diğer kullanıcıların tariflerini yorumlayabilir, beğenebilir.
- **Yemek Kategorileri**: Tatlılar, kahve, kokteyller gibi kategorilerde yemek tariflerine ulaşılabilir.
- **Kişisel Öneriler**: Vegan, tatlıcı, hamur işi seven gibi kullanıcılara özel tarif önerileri.
- **Haftalık Yemek Yarışmaları**: Kullanıcılar, haftalık belirli malzemelerle en iyi tarifi yaparak ödüller kazanabilirler.
- **Yemek Çarkı**: Kullanıcılar, çarkı çevirerek rastgele yemek önerisi alabilir.
- **Yemek Görseli Doğrulama**: Google Vision ve DeepAI Image Recognition API'leri ile yemek görselleri doğrulanabilir.

## Teknolojiler

- **Frontend**: React.js, Material UI, Axios
- **Backend**: Node.js, Express.js, JWT (JSON Web Token), bcryptjs
- **Veritabanı**: MongoDB (Mongoose ile bağlantı)
- **Diğer**: Google Vision API, DeepAI Image Recognition

## Kurulum

1. **Frontend (React.js)**

   - Frontend dizinine gidin:
     ```bash
     cd client
     ```

   - Bağımlılıkları yükleyin:
     ```bash
     npm install
     # veya
     yarn install
     ```

   - Uygulamayı başlatın:
     ```bash
     npm start
     # veya
     yarn start
     ```

2. **Backend (Node.js, Express.js)**

   - Backend dizinine gidin:
     ```bash
     cd server
     ```

   - Bağımlılıkları yükleyin:
     ```bash
     npm install
     # veya
     yarn install
     ```

   - **.env** dosyasını oluşturun ve aşağıdaki bilgileri ekleyin:
     ```env
     JWT_SECRET=supersecretkey
     MONGO_URI=mongodb://localhost:27017/cookify
     ```

   - Backend server'ı başlatın:
     ```bash
     npm run dev
     # veya
     yarn dev
     ```

## Kullanıcı Endpoints

### 1. **Kullanıcı Kaydı (Register)**
   - **POST** `/api/users/register`
   - Kullanıcı adı, e-posta ve şifre ile yeni kullanıcı kaydedin.

### 2. **Kullanıcı Girişi (Login)**
   - **POST** `/api/users/login`
   - Kullanıcı, e-posta ve şifre ile giriş yaparak JWT token alır.

### 3. **Kullanıcı Güncelleme**
   - **PUT** `/api/users/update/:userId`
   - Kullanıcı bilgilerini günceller.

### 4. **Kullanıcıyı E-posta ile Bulma**
   - **GET** `/api/users/find/:email`
   - E-posta ile kullanıcıyı arar.

### 5. **Tüm Kullanıcıları Listeleme**
   - **GET** `/api/users`
   - Tüm kullanıcıları listeler.

## Test API

### 1. **Tarifleri Listeleme**
   - **GET** `/api/recipes`
   - Tüm tarifleri listeler.

### 2. **Tarif Ekleme**
   - **POST** `/api/recipes`
   - Yeni bir tarif ekler.

### 3. **Tarif Güncelleme**
   - **PUT** `/api/recipes/:id`
   - Mevcut bir tarifin içeriğini günceller.

### 4. **Tarif Silme**
   - **DELETE** `/api/recipes/:id`
   - Mevcut bir tarifi siler.

## Katkıda Bulunma

Proje açık kaynaklıdır. Eğer geliştirmelere katkıda bulunmak isterseniz, aşağıdaki adımları takip edebilirsiniz:

1. Bu projeyi **fork**'layın.
2. Yeni bir **branch** oluşturun (`git checkout -b feature-name`).
3. Değişikliklerinizi yapın ve **commit**'leyin (`git commit -am 'Added new feature'`).
4. **Push** yapın (`git push origin feature-name`).
5. Bir **pull request** oluşturun.
