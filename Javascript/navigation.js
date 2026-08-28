export function SetActiveItem()
{
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navs = document.querySelectorAll('#Navigation');

    for(const nav of navs)
    {
        const items = nav.querySelectorAll('.NavItem');

        for(const item of items)
        {
            let href = item.getAttribute('href');
            href = href.split("/").pop();
            if(item.getAttribute('href') === currentPage)
            {
                item.classList.add('active');
            }
        }
    }
}