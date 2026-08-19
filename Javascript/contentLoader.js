// Adds the Header and Footer html elements to the page
export function InsertPageElements()
{
    return Promise.all([
        InsertPageElement("#HeaderTarget", 'header.html'),
        InsertPageElement("#FooterTarget", 'footer.html'),
        InsertPageElement("#InPageNavigationTarget", 'inPageNavigation.html'),
        InsertPageElement("#ImageModalTarget", 'imagemodal.html')
    ]);
}

function InsertPageElement(id, content) 
{
    const target = document.querySelector(id);

    if(target)
    {
        return fetch(content)
            .then(response => response.text())
            .then(data => 
            {
                const element = document.createElement('div');
                element.innerHTML = data;
                target.replaceWith(element);
            });

    }

    return Promise.resolve();
}