import React from "react";
import { Container, Typography, Paper, Divider, Box } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Gizlilik Politikası
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" paragraph>
          Cookify olarak, kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz.
          Bu gizlilik politikası, Cookify platformu üzerinden toplanan kişisel bilgilerin nasıl işlendiğini ve korunduğunu açıklamaktadır.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Toplanan Bilgiler
        </Typography>
        <Typography variant="body1" paragraph>
          Cookify'ı kullanırken aşağıdaki türde bilgileri toplayabiliriz:
        </Typography>
        <ul>
          <li>Ad, e-posta adresi gibi kimlik bilgileri (hesap oluştururken sağladığınız)</li>
          <li>Tarif paylaşım, beğenme ve yorum aktiviteleriniz</li>
          <li>Web sitesi kullanım istatistikleri ve çerezler aracılığıyla toplanan bilgiler</li>
        </ul>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Bilgilerin Kullanımı
        </Typography>
        <Typography variant="body1" paragraph>
          Topladığımız bilgileri şu amaçlarla kullanırız:
        </Typography>
        <ul>
          <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
          <li>Hesabınızı yönetmek ve destek sağlamak</li>
          <li>İçerik önerileri sunmak ve kişiselleştirmek</li>
          <li>Kullanıcı eğilimlerini analiz ederek platform deneyimini iyileştirmek</li>
        </ul>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Bilgilerin Paylaşımı
        </Typography>
        <Typography variant="body1" paragraph>
          Kişisel bilgileriniz, açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz. Ancak yasal yükümlülükler çerçevesinde veya mahkeme kararlarıyla paylaşım yapılabilir.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. Çerezler
        </Typography>
        <Typography variant="body1" paragraph>
          Cookify, kullanıcı deneyimini geliştirmek için çerezler kullanır. Çerez ayarlarınızı tarayıcınızdan yönetebilirsiniz.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. Gizlilik Politikasındaki Değişiklikler
        </Typography>
        <Typography variant="body1" paragraph>
          Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler web sitemizde yayınlanacaktır.
        </Typography>

        <Typography variant="body1" paragraph>
          Gizlilik politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;