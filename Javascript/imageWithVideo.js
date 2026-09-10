const HIDE_IMAGE_CLASS = "HideGameImage";
const SHOW_IMAGE_CLASS = "ShowGameImage";

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

    let video = target.children[0];
    let image = target.children[1];

    if(bEntered)
    {
        image.classList.add(HIDE_IMAGE_CLASS);
        image.classList.remove(SHOW_IMAGE_CLASS);
        video.style.width = image.clientWidth + "px";
        video.style.height = image.clientHeight + "px";
        
        video.play();
    }
    else
        {
        image.classList.remove(HIDE_IMAGE_CLASS);
        image.classList.add(SHOW_IMAGE_CLASS);
        video.pause();
    }

}
