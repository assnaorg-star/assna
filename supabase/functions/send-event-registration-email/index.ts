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
  const eventId = record.eventId;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  let event = null;
  let dateStr = "N/A";
  let timeStr = "N/A";

  if (supabaseUrl && supabaseServiceRoleKey && eventId) {
    try {
      console.log(`Fetching event details for event ID: ${eventId}`);
      const eventUrl = `${supabaseUrl}/rest/v1/events?id=eq.${eventId}&select=*`;
      const eventResponse = await fetch(eventUrl, {
        headers: {
          "apikey": supabaseServiceRoleKey,
          "Authorization": `Bearer ${supabaseServiceRoleKey}`,
        },
      });

      if (eventResponse.ok) {
        const events = await eventResponse.json();
        if (events && events.length > 0) {
          event = events[0];
          console.log("Successfully fetched event:", event.talkTitle);
          
          if (event.date) {
            const dateObj = new Date(event.date);
            const timeZone = event.timezone || "America/Chicago";
            dateStr = new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone,
            }).format(dateObj);
            
            timeStr = new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone,
              timeZoneName: "short",
            }).format(dateObj);
          }
        } else {
          console.warn(`No event found in DB for ID: ${eventId}`);
        }
      } else {
        console.error(`Failed to fetch event: ${eventResponse.status} ${eventResponse.statusText}`);
      }
    } catch (e) {
      console.error("Error fetching or parsing event details:", e);
    }
  } else {
    console.warn("Supabase env credentials or eventId missing, proceeding with basic details");
  }

  const talkTitle = event ? event.talkTitle : "Upcoming ASSNA Event";
  const speaker = event ? event.speaker : "Guest Speaker";
  const speakerAffiliation = event ? event.affiliation : "N/A";
  const eventType = event ? event.type : "Event";
  const description = event ? event.description : "";
  const zoomUrl = event ? event.zoomUrl : null;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "welcome@assna.org",
      to: email,
      subject: `Event Registration Confirmation: ${talkTitle} 🗓️`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Event Registration Confirmation</title>
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
                      
                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 25px 0; font-weight: 300;">
                        You have successfully registered for the upcoming ASSNA event! Below are the details for your event attendance.
                      </p>

                      <!-- Event Details (Gold Box) -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fcfbfa; border-radius: 8px; border: 1px solid #e8cc7e; padding: 20px; margin-bottom: 25px;">
                        <tr>
                          <td>
                            <h3 style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: 700; color: #0f1d3e; margin: 0 0 12px 0; border-bottom: 1px solid #e8cc7e; padding-bottom: 8px;">Event Details</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.6; color: #3a4a6b;">
                              <tr>
                                <td width="120" valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Talk Title:</td>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #0f1d3e;">${talkTitle}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Speaker:</td>
                                <td valign="top" style="padding: 4px 0;">${speaker} (${speakerAffiliation})</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Date:</td>
                                <td valign="top" style="padding: 4px 0;">${dateStr}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Time:</td>
                                <td valign="top" style="padding: 4px 0;">${timeStr}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Type:</td>
                                <td valign="top" style="padding: 4px 0;"><span style="background-color: #0f1d3e; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase; font-weight: 600; display: inline-block;">${eventType}</span></td>
                              </tr>
                              ${zoomUrl ? `
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Zoom Link:</td>
                                <td valign="top" style="padding: 4px 0;"><a href="${zoomUrl}" target="_blank" style="color: #c8a84b; text-decoration: underline; font-weight: bold;">Join Meeting</a></td>
                              </tr>
                              ` : ""}
                              ${description ? `
                              <tr>
                                <td valign="top" style="padding: 6px 0 4px 0; font-weight: bold; color: #1a2b5c;">Description:</td>
                                <td valign="top" style="padding: 6px 0 4px 0; font-style: italic; font-size: 12px; color: #5a6a8b;">${description}</td>
                              </tr>
                              ` : ""}
                            </table>
                          </td>
                        </tr>
                      </table>

                      ${zoomUrl ? `
                      <!-- Zoom Join Button -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" style="background-color: #0f1d3e; border-radius: 6px; border: 1px solid #c8a84b;">
                              <tr>
                                <td align="center" style="padding: 12px 28px;">
                                  <a href="${zoomUrl}" target="_blank" style="font-family: Georgia, 'Times New Roman', serif; font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block; letter-spacing: 0.5px;">Join Live Zoom Meeting 🌐</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      ` : ""}

                      <!-- Divider -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                        <tr>
                          <td height="1" style="background-color: #d8dde8; line-height: 1px; font-size: 1px;">&nbsp;</td>
                        </tr>
                      </table>

                      <!-- Registrant Details -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f9fc; border-radius: 8px; border: 1px solid #d8dde8; padding: 20px; margin-bottom: 25px;">
                        <tr>
                          <td>
                            <h3 style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: 700; color: #0f1d3e; margin: 0 0 12px 0; border-bottom: 1px solid #d8dde8; padding-bottom: 8px;">Your Registration Details</h3>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.6; color: #3a4a6b;">
                              <tr>
                                <td width="120" valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Full Name:</td>
                                <td valign="top" style="padding: 4px 0;">${fullName}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Email:</td>
                                <td valign="top" style="padding: 4px 0;">${email}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Affiliation:</td>
                                <td valign="top" style="padding: 4px 0;">${record.affiliation || "N/A"}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="padding: 4px 0; font-weight: bold; color: #1a2b5c;">Position:</td>
                                <td valign="top" style="padding: 4px 0;">${record.position || "N/A"}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 14px; line-height: 1.7; color: #3a4a6b; margin: 0 0 15px 0; font-weight: 300;">
                        We look forward to seeing you at the event. If you need to make any changes to your registration or have questions, please reach out to us at <a href="mailto:info@assna.org" style="color: #c8a84b; text-decoration: none; font-weight: bold;">info@assna.org</a>.
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
