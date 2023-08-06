/**
 * A wrapper class for Mailjet's Node.js library.
 * Provides a simplified interface for sending emails using Mailjet's API.
 */
class MailjetWrapper {
  /**
   * Constructs a new instance of the MailjetWrapper.
   *
   * @param {Object} config Configuration options for the wrapper.
   * @param {string} config.apiKey Your Mailjet API key.
   * @param {string} config.apiSecret Your Mailjet API secret.
   * @param {Object} [config.dependencies={}] Dependencies required by the wrapper.
   * @param {Object} config.dependencies.mailjet The Mailjet library instance.
   * @param {Object|null} [config.dependencies.logger=null] Logger instance. If not provided, no logs will be output.
   * @param {Object} [config.options={}] Options for the wrapper.
   * @param {string} [config.options.apiVersion='v3.1'] API version to be used with Mailjet.
   */
  constructor({
    apiKey,
    apiSecret,
    dependencies = {
      mailjet: null,
      logger: null,
    },
    options = {
      apiVersion: "v3.1",
    },
  }) {

    this.mailjet = dependencies.mailjet.apiConnect(apiKey, apiSecret);
    this.apiVersion = options.apiVersion;
    this.logger = dependencies.logger;

    if (!dependencies.mailjet) {
      throw new Error("The 'mailjet' dependency must be provided.");
    }

  }

  /**
   * Logs a message using the provided logger in the dependencies.
   * If no logger is provided, this function does nothing.
   *
   * @param {string} message The message to log.
   * @param {string} [level='info'] The log level ('info', 'error', etc.).
   */
  log(message, level = "info") {
    if (this.logger && typeof this.logger[level] === "function") {
      this.logger[level](message);
    }
  }

  /**
   * Sends an email using Mailjet's API.
   *
   * @async
   * @param {string} subject The subject of the email.
   * @param {string} textContent The textual content of the email.
   * @param {string[]} recipients List of email addresses to send the email to.
   * @param {string} [fromEmail="your-email@example.com"] Sender's email address.
   * @param {string} [fromName="Your Name"] Sender's name.
   *
   * @returns {Promise<Object>} Resolves with details about the sent message, including message ID and status.
   */
  async send(
    subject,
    textContent,
    recipients,
    fromEmail = "your-email@example.com",
    fromName = "Your Name"
  ) {
    let emails = recipients.map((email) => ({ Email: email }));

    const request = this.mailjet
      .post("send", { version: this.apiVersion })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName,
            },
            To: emails,
            Subject: subject,
            TextPart: textContent,
          },
        ],
      });

    try {
      const response = await request;
      this.log("Email sent successfully!");
      return {
        success: true,
        messageId: response.body.Messages[0].To[0].MessageID, // Exemple d'accès à l'ID du message
        status: response.body.Messages[0].Status, // Exemple d'accès au statut du message
        fullResponse: response.body,
      };
    } catch (error) {
      this.log(`Error occurred while sending email: ${error.message}`, "error");
      throw error;
    }
  }
}

module.exports = MailjetWrapper;
