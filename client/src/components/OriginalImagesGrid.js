

const OriginalImagesGrid = () => {
    const numGroups = 4; 
    const numImgsPerGroup = 4;

    return (
        <div className="grid">
            {Array.from({ length: numGroups }).map((_, groupIndex) => (
                Array.from({ length: numImgsPerGroup }).map((_, imgIndex) => (
                    <div key={`${groupIndex}-${imgIndex}`} className="cell">
                        <img 
                            src={`../images/img_original/img${groupIndex + 1}${imgIndex + 1}.png`} 
                            alt={`Image Group ${groupIndex + 1}, Image ${imgIndex + 1}`}
                        />
                    </div>
                ))
            ))}
        </div>
    );

};

export default OriginalImagesGrid;