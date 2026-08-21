import * as tooltip from './tooltip.js'

// Adds the Header and Footer html elements to the page
export async function InsertPageElements()
{
    return Promise.all([
        InsertPageElement("#HeaderTarget", 'header.html'),
        InsertPageElement("#FooterTarget", 'footer.html'),
        InsertPageElement("#InPageNavigationTarget", 'inpagenavigation.html'),
        InsertPageElement("#ImageModalTarget", 'imagemodal.html'),
        InsertPageElement("#GithubSideTabTarget", 'githubsidetab.html', TransferHRef),
    ]);
}

async function InsertPageElement(id, content, lambda = () => {}) 
{
    const targets = document.querySelectorAll(id);

    if(targets.length <= 0)
    {
        return Promise.resolve();
    }

    const response = await fetch(content);
    const data = await response.text();

    for(const target of targets)
    {
        const element = document.createElement('div');
        element.innerHTML = data;

        lambda(element, target);

        target.replaceWith(element);
    }

    return Promise.resolve();
}

async function BuildPageElement(id, content, lambda = () => {}) 
{
    const targets = document.querySelectorAll(id);

    if(targets.length <= 0)
    {
        return Promise.resolve();
    }

    const response = await fetch(content);
    const data = await response.text();

    for(const target of targets)
    {
        lambda(element, target, data);
    }

    return Promise.resolve();
}

function TransferHRef(target, source)
{
    target.children[0].children[0].href = source.dataset.href;
}