window.addEventListener('load', () => {
    const form = document.forms[0];
    const urlIn = form.querySelector('input');

    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        try {
            const resp = await fetch('/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "url": String(urlIn.value)
                })
            });
            if (resp.status == 200) {
                const json = await resp.json();
                urlIn.value = `${location.origin}/${json.shortid}`;
            } else {
                alert(`There was a server error: ${resp.statusText}`);
            }
        } catch (ex) {
            alert(`There was an error processing your request: ${ex}`);
            console.error(ex);
        }
    });
})