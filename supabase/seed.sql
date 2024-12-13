INSERT INTO public.email_templates (name, subject, body) 
VALUES (
  'detailed_analysis',
  'Your Detailed Creator Business Analysis',
  '<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
    .footer { text-align: center; padding: 20px 0; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Creator Business Analysis</h1>
    </div>
    <div class="content">
      {{analysis}}
    </div>
    <div class="footer">
      <p>This analysis was generated based on your assessment results.</p>
    </div>
  </div>
</body>
</html>'
);