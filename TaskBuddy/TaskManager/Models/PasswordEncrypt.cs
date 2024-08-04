using System;
using System.Security.Cryptography;
using System.Text;

namespace TaskManager.Models
{
    public class PasswordEncrypt
    {
        public static string HashPassword(string password)
        {
            // Create a SHA256 hash from the password
            using (SHA256 sha256 = SHA256.Create())
            {
                // Convert the password string to a byte array
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert the byte array to a hex string
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }

                return builder.ToString();
            }
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            // Hash the input password
            string hashedInputPassword = HashPassword(password);

            // Compare the hashed input password with the stored hashed password
            return hashedInputPassword.Equals(hashedPassword, StringComparison.OrdinalIgnoreCase);
        }
    }
}
