import urllib.request
import os
import sys

SITE_ID = "merry-brigadeiros-d70173"
ZIP_PATH = r"c:\Users\V NIKITHA\OneDrive\Desktop\demo\dist.zip"

def deploy(auth_token):
    if not os.path.exists(ZIP_PATH):
        print(f"Error: {ZIP_PATH} not found.")
        return False
    
    url = f"https://api.netlify.com/api/v1/sites/{SITE_ID}/deploys"
    print(f"Deploying {ZIP_PATH} to Netlify site '{SITE_ID}'...")
    
    with open(ZIP_PATH, "rb") as f:
        zip_data = f.read()

    req = urllib.request.Request(
        url,
        data=zip_data,
        headers={
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/zip",
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            print("Status Code:", resp.status)
            res_body = resp.read().decode("utf-8")
            print("Deployment successful!")
            print(f"Live URL: https://{SITE_ID}.netlify.app")
            return True
    except urllib.error.HTTPError as e:
        print(f"Deployment failed. HTTP {e.code}: {e.reason}")
        print(e.read().decode("utf-8"))
        return False

if __name__ == "__main__":
    token = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("NETLIFY_AUTH_TOKEN")
    if not token:
        print("Usage: python deploy_to_netlify.py <YOUR_NETLIFY_PERSONAL_ACCESS_TOKEN>")
        sys.exit(1)
    deploy(token)
