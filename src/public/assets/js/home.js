window.addEventListener('load', () => {
    const form = document.forms[0];
    const urlIn = form.querySelector('input');

    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        try {
            const resp = await fetch(`/add?url=${urlIn.value}`, {
                method: 'POST',
                body: JSON.stringify({
                    url: url
                })
            });
            const json = await resp.json();
            urlIn.value = `${location.origin}/${json.shortid}`;
        } catch (ex) {
            alert(`There was an error processing your request: ${ex}`);
            console.error(ex);
        }
    });
})