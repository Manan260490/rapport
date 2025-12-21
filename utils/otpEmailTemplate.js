module.exports = otpEmailTemplate = (otp) => {
  let mailBody = `

<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" dir="ltr">
	<head>
		<title>Password Reset OTP</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style type="text/css">
			#outlook a{padding: 0;}
			.ReadMsgBody{width: 100%;}
			.ExternalClass{width: 100%;}
			.ExternalClass *{line-height: 100%;}
			body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
			table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
			img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
			p{display: block; margin: 13px 0;}
		</style>
		<!--[if !mso]><!-->
			<style type="text/css">
				@media only screen and (max-width:480px) {
					@-ms-viewport {width: 320px;}
					@viewport {	width: 320px; }
				}
			</style>
		<!--<![endif]-->
		<!--[if mso]>
		<xml>
			<o:OfficeDocumentSettings>
				<o:AllowPNG/>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		<!--[if lte mso 11]>
		<style type="text/css">
			.outlook-group-fix{width:100% !important;}
		</style>
		<![endif]-->
		<style type="text/css">
@media only screen and (max-width:480px) {
}
@media only screen and (min-width:480px) {
.dys-column-per-100 {
	width: 100.000000% !important;
	max-width: 100.000000%;
}
}
a {color: #0000EE;text-decoration: underline;}</style>
		<!--[if !mso]><!--><link href='https://fonts.googleapis.com/css?family=Martel:300,400,700,900&display=swap' rel='stylesheet' type='text/css'><style type='text/css'>@import url(https://fonts.googleapis.com/css?family=Martel:300,400,700,900&display=swap);</style><!--<![endif]-->
	</head>
	<body style="background-color: #FFFFFF;"><div style="background-color: #FFFFFF;">

   <!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" style="width:700px;" width="700"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]--><div style='margin:0px auto;max-width:700px;'><table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'><tbody><tr><td style='direction:ltr;font-size:0px;padding:10px 20px;text-align:center;vertical-align:top;'><!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:700px;">
<![endif]--><div class='dys-column-per-100 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'><table border='0' cellpadding='0' cellspacing='0' role='presentation' style='vertical-align:top;' width='100%'>
      <tr><td align='left' style='font-size:0px;padding:10px 25px;word-break:break-word;'><div style='color:#121212;font-family:Martel, Helvetica, Arial, sans-serif;font-size:18px;font-weight:light;line-height:28px;text-align:left;'><p style="margin-top:0;margin-bottom:0">OTP for change of your password at Rapport HR portal is <strong><span style="color:pink">${otp}</span></strong>. Please use this OTP to complete the transaction. Please do not share this with anyone. Rapport HR don't call/email you to verify OTP.</p></div></td></tr>
    </table></div><!--[if mso | IE]>
</td></tr></table>
<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</div></body> </html>`;
  return mailBody;
};
