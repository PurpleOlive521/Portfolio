const SHOW_VIDEO_CLASS = "ShowGameVideo";

export function BindToImageWithVideos()
{
    const imageContainers = document.querySelectorAll('.ImageWithVideo');

    for(const container of imageContainers)
    {
        container.addEventListener("mouseenter", (event) => {
            OnImageWithVideoHovered(event, true /* bEntered */);
        });

        container.addEventListener("mouseleave", (event) => {
            OnImageWithVideoHovered(event, false /* bEntered */);
        });
    }
}

function OnImageWithVideoHovered(event, bEntered)
{
    let target = event.target;

    let video = target.querySelector('video');
    let image = target.querySelector('img');

    if(bEntered)
    {
        video.classList.add(SHOW_VIDEO_CLASS);
        video.style.width = image.clientWidth + "px";
        video.style.height = image.clientHeight + "px";
        
        video.play();
    }
    else
    {
        video.classList.remove(SHOW_VIDEO_CLASS);
        video.pause();
    }

}
