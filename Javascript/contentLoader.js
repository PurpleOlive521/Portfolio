
const HEADER_TARGET = document.querySelector('#HeaderTarget');
const FOOTER_TARGET = document.querySelector('#FooterTarget');
const IN_PAGE_NAVIGATION_TARGET = document.querySelector('#InPageNavigationTarget');

// Adds the Header and Footer html elements to the page
export function InsertPageElements()
{
    return Promise.all([
        InsertPageElement(HEADER_TARGET, 'header.html'),
        InsertPageElement(FOOTER_TARGET, 'footer.html'),
        InsertPageElement(IN_PAGE_NAVIGATION_TARGET, 'inPageNavigation.html')
    ]);
}

function InsertPageElement(target, content) 
{
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