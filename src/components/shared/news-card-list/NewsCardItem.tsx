import { NewsItem } from 'common/types';
import { useProgressiveImg } from 'common/hooks';
import { formatTimestamp, truncateText } from 'common/utils';
import { BookmarkIcon } from 'components/shared';

interface Props {
  itemData: NewsItem;
  isLatest?: boolean;
  isSaved?: boolean;
  onSaveToggle: (newsItemId: NewsItem) => void;
}

const fallbackNewsCardImage = './fallback-news-bg.png';

export const NewsCardItem: React.FC<Props> = ({
  itemData,
  isLatest,
  isSaved,
  onSaveToggle,
}) => {
  const { src: imageSrc, blur } = useProgressiveImg(
    fallbackNewsCardImage,
    itemData?.image,
  );
  const { headline, image, related, datetime, url, summary } = itemData;

  const formattedDate = formatTimestamp(datetime, {
    day: 'numeric',
    month: 'short',
  });

  const handleBookmarkIconClick = () => {
    onSaveToggle(itemData);
  };

  return (
    <div
      className={`group h-full min-h-[300px] rounded-md relative overflow-hidden mb-5 bg-gradient-1 ${
        blur ? 'blur-sm' : ''
      }`}
    >
      {image && (
        <img
          className={`absolute transition-opacity opacity-50 object-cover h-full max-h-full bg-gradient-1 ${
            !isLatest ? 'group-hover:opacity-75' : ''
          }`}
          src={imageSrc}
          alt={`${related} news image`}
        />
      )}
      <div className="relative py-7 pl-6 pr-5 h-[425px] xl:h-full flex flex-col justify-between min-h-[inherit]">
        {isLatest && (
          <span className="absolute right-[30px] py-1 px-[6px] bg-red uppercase text-[8px] leading-[9px]">
            Latest news
          </span>
        )}
        <span className="border rounded-full py-[5px] px-[15px] text-[10px]  self-start">
          {related}
        </span>
        <div>
          <h3 className={`mb-2 ${isLatest ? 'text-2xl' : 'text-xl'}`}>
            {headline}
          </h3>
          {summary && (
            <p className="text-xs mb-5 opacity-75">
              {truncateText(summary, 100)}
            </p>
          )}
          <div className="flex justify-between items-center">
            {isLatest && (
              <a
                href={url}
                target="_blank"
                className="flex border-r border-opacity-8 pr-4 mr-4"
                rel="noreferrer"
              >
                <img src="/arrow-right-icon.svg" alt="" />
                <span className="font-bold text-sm ml-3 hover:opacity-80">
                  Read the research
                </span>
              </a>
            )}
            <div className="text-xs opacity-75 flex-1">{formattedDate}</div>
            <BookmarkIcon
              isActive={!!isSaved}
              onClick={handleBookmarkIconClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
