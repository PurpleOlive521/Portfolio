export function SetActiveItem()
{
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navs = document.querySelectorAll('#Navigation');

    for(const nav of navs)
    {
        const items = nav.querySelectorAll('.NavItem');

        for(const item of items)
        {
            if(item.getAttribute('href') === currentPage)
            {
                item.classList.add('active');
            }
        }
    }
}