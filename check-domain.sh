#!/bin/bash

echo "=== Netlify Domain Configuration Checker ==="
echo ""

# Get the custom domain from user
read -p "Enter your custom domain (e.g., example.com): " CUSTOM_DOMAIN

if [ -z "$CUSTOM_DOMAIN" ]; then
    echo "No domain provided. Exiting."
    exit 1
fi

echo ""
echo "Checking domain: $CUSTOM_DOMAIN"
echo ""

# Check if domain resolves
echo "1. DNS Resolution Check:"
if nslookup $CUSTOM_DOMAIN > /dev/null 2>&1; then
    echo "✅ Domain resolves successfully"
    nslookup $CUSTOM_DOMAIN
else
    echo "❌ Domain does not resolve"
fi

echo ""
echo "2. HTTP Response Check:"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$CUSTOM_DOMAIN" 2>/dev/null)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Site is accessible (HTTP 200)"
elif [ "$HTTP_STATUS" = "000" ]; then
    echo "❌ Site is not accessible (connection failed)"
else
    echo "⚠️  Site returned HTTP $HTTP_STATUS"
fi

echo ""
echo "3. SSL Certificate Check:"
if openssl s_client -connect $CUSTOM_DOMAIN:443 -servername $CUSTOM_DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates > /dev/null 2>&1; then
    echo "✅ SSL certificate is valid"
    openssl s_client -connect $CUSTOM_DOMAIN:443 -servername $CUSTOM_DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates
else
    echo "❌ SSL certificate issue or connection failed"
fi

echo ""
echo "4. Netlify Load Balancer Check:"
if dig $CUSTOM_DOMAIN +short | grep -E "^(75\.2\.|52\.|3\.)" > /dev/null; then
    echo "✅ Domain points to Netlify load balancer"
else
    echo "❌ Domain does not point to Netlify load balancer"
    echo "   Expected IP ranges: 75.2.x.x, 52.x.x.x, or 3.x.x.x"
fi

echo ""
echo "=== Troubleshooting Steps ==="
echo "If any checks failed:"
echo "1. Go to Netlify Dashboard > Site Settings > Domain Management"
echo "2. Add your custom domain if not already added"
echo "3. Update your DNS records:"
echo "   - A record: @ → 75.2.60.5"
echo "   - CNAME record: www → your-site-name.netlify.app"
echo "4. Wait up to 24 hours for DNS propagation and SSL certificate"
echo ""
echo "For more help: https://docs.netlify.com/domains-https/custom-domains/"