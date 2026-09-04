//  Expressed as CSS-classes
export const FORBID_SCROLLABLE_AUTOPLAY = "ScrollableAutoplayDisabled";
export const SCROLLABLE_AUTOPLAY = "ScrollableAutoplay";

export function BindToScrollableAutoplays()
{
    const options = {
        root: null,
        rootMargin: "0px",
        scrollMargin: "0px",
        threshold: 0.5,
    };

    const observer = new IntersectionObserver(OnElementScrolledIntoView, options);

    const scrollableAutoplays = document.getElementsByClassName(SCROLLABLE_AUTOPLAY);
    for(const autoplay of scrollableAutoplays)
    {
        observer.observe(autoplay);
        autoplay.pause();
    }
}

function OnElementScrolledIntoView(entries, observer)
{
    for(const entry of entries)
    {
        let target = entry.target;
        
        if(entry.isIntersecting)
        {
            if(!target.classList.contains(FORBID_SCROLLABLE_AUTOPLAY))
            {
                target.play();
            }
        }
        else
        {
            target.pause();
        }
    }
}