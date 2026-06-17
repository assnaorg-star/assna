Deno.serve(async (req: Request) => {
  const body = await req.json();

  console.log("Webhook payload:", body);

  // Supabase webhook safe parsing
  const record = body.record || body.new;

  if (!record) {
    return new Response("No record found", { status: 400 });
  }

  const email = record.email;
  const fullName = record.fullName;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "welcome@assna.org",
      to: email,
      subject: "Welcome to ASSNA 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ASSNA</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f4ef; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1a2b5c;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f4ef; padding: 20px 0;">
            <tr>
              <td align="center">
                <!-- Card Container -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #d8dde8; box-shadow: 0 4px 24px rgba(26,43,92,0.06);">
                  
                  <!-- Header (Navy Deep) -->
                  <tr>
                    <td align="center" style="background-color: #0f1d3e; padding: 40px 20px; border-bottom: 3px solid #c8a84b;">
                      <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 1px; display: block; margin-bottom: 5px;">ASSNA</span>
                      <span style="font-size: 10px; color: #e8cc7e; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; display: block;">Association of Sri Lankan Statisticians in North America</span>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px; background-color: #ffffff;">
                      <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 700; color: #0f1d3e; margin: 0 0 20px 0; line-height: 1.3;">Hello ${fullName},</h1>
                      
                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 20px 0; font-weight: 300;">
                        Thank you for joining the <b>Association of Sri Lankan Statisticians in North America (ASSNA)</b>! We are thrilled to welcome you to our professional and academic community.
                      </p>

                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 25px 0; font-weight: 300;">
                        ASSNA is dedicated to advancing statistical science, strengthening professional networks, and promoting collaboration among Sri Lankan statisticians, data scientists, biostatisticians, and quantitative researchers in North America.
                      </p>

                      <!-- Divider -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                        <tr>
                          <td height="1" style="background-color: #d8dde8; line-height: 1px; font-size: 1px;">&nbsp;</td>
                        </tr>
                      </table>

                      <!-- Registration Details (Gold Box) -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcfbfa; border-radius: 8px; border: 1px solid #e8cc7e; padding: 20px; margin-bottom: 25px;">
                        <tr>
                          <td>
                            <h3 style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: 700; color: #0f1d3e; margin: 0 0 12px 0; border-bottom: 1px solid #e8cc7e; padding-bottom: 8px;">Your Membership Details</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.6; color: #3a4a6b;">
                              <tr>
                                <td width="120" valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Member ID:</td>
                                <td valign="top" style="padding: 4px 0; color: #c8a84b; font-weight: bold; font-family: monospace;">${record.id}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Full Name:</td>
                                <td valign="top" style="padding: 4px 0;">${fullName}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Position:</td>
                                <td valign="top" style="padding: 4px 0;">${record.position || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Affiliation:</td>
                                <td valign="top" style="padding: 4px 0;">${record.affiliation || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Expertise:</td>
                                <td valign="top" style="padding: 4px 0;">${record.expertise || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Location:</td>
                                <td valign="top" style="padding: 4px 0;">${record.state ? record.state + ', ' : ''}${record.country || 'N/A'}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 10px 0; font-weight: 300;">
                        As a member, you will receive updates on upcoming events, mentorship opportunities, and resources dedicated to your professional growth.
                      </p>
                      
                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 0 0; font-weight: 300;">
                        If you have any questions or would like to get involved in ASSNA's activities, please don't hesitate to reach out to us at <a href="mailto:info@assna.org" style="color: #c8a84b; text-decoration: none; font-weight: bold;">info@assna.org</a>.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer (Navy Deep) -->
                  <tr>
                    <td align="center" style="background-color: #0f1d3e; padding: 30px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
                      <p style="font-size: 11px; line-height: 1.6; color: rgba(255, 255, 255, 0.6); margin: 0 0 8px 0;">
                        © 2026 Association of Sri Lankan Statisticians in North America.<br>All rights reserved.
                      </p>
                      <p style="font-size: 10px; color: #e8cc7e; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                        Advancing statistical science through collaboration, mentorship, and service.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    }),
  });

  const resText = await response.text();
  console.log("Resend response status:", response.status);
  console.log("Resend response body:", resText);

  return new Response(resText, {
    headers: { "Content-Type": "application/json" },
  });
});