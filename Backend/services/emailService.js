const axios = require("axios");
require("dotenv").config();

const sendBudgetAlert = async (
  userEmail,
  totalSpent,
  budgetLimit,
  category
) => {
  try {
    const overAmount = totalSpent - budgetLimit;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">⚠️ Budget Alert!</h2>
        <p>You've exceeded your <strong>${category}</strong> budget.</p>
        <div style="background-color: #fee; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Budget Limit:</strong> $${budgetLimit.toFixed(2)}</p>
          <p><strong>Total Spent:</strong> $${totalSpent.toFixed(2)}</p>
          <p style="color: #dc2626;"><strong>Over Budget By:</strong> $${overAmount}</p>
        </div>
        <p>Consider reviewing your expenses to stay within budget.</p>
      </div>
    `;

    const textContent = `
      Budget Alert!
      
      You've exceeded your ${category} budget.
      
      Budget Limit: $${budgetLimit.toFixed(2)}
      Total Spent: $${totalSpent.toFixed(2)}
      Over Budget By: $${overAmount}
      
      Consider reviewing your expenses to stay within budget.
    `;

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "budget tracker",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: userEmail,
            name: userEmail.split("@")[0],
          },
        ],
        subject: `Budget alert: ${category} budget exceeded`,
        htmlContent: htmlContent,
        textContent: textContent,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("Budget alert email sent successfully:", response.data);
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error(
      "Error sending budget alert email:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send budget alert email");
  }
};

module.exports = { sendBudgetAlert };
