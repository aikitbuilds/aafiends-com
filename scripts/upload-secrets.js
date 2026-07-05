const fs = require('fs');
const { execSync } = require('child_process');

const env = fs.readFileSync('.env', 'utf8');
const geminiMatch = env.match(/GEMINI_API_KEY="(.*?)"/);
const adminMatch = env.match(/ADMIN_SERVICE_ACCOUNT_KEY='(.*?)'/);
const proj = "--project=gen-lang-client-0686783756";

if (geminiMatch) {
  fs.writeFileSync('gemini.txt', geminiMatch[1]);
  try { execSync(`gcloud secrets create GEMINI_API_KEY --replication-policy="automatic" ${proj}`); } catch(e){}
  execSync(`gcloud secrets versions add GEMINI_API_KEY --data-file=gemini.txt ${proj}`);
  fs.unlinkSync('gemini.txt');
  console.log('Added GEMINI_API_KEY version');
}

if (adminMatch) {
  fs.writeFileSync('admin.txt', adminMatch[1]);
  try { execSync(`gcloud secrets create ADMIN_SERVICE_ACCOUNT_KEY --replication-policy="automatic" ${proj}`); } catch (e) {}
  execSync(`gcloud secrets versions add ADMIN_SERVICE_ACCOUNT_KEY --data-file=admin.txt ${proj}`);
  fs.unlinkSync('admin.txt');
  console.log('Added ADMIN_SERVICE_ACCOUNT_KEY version');
}
