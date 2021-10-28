import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { YOUTUBE_REGEX } from '@modules/consts';

import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';

import PostCard from '@components/molecules/PostCard';
import { useToast } from '@components/molecules/Notification';

import PortfolioLinkModal from '@components/templates/Modals/PortfolioLink';

import getThumbPortfolio from '@src/utils/portfolio';
import { getCoverImage } from '@src/utils/presentation';
import errorHandle from '@src/utils/error';

import ShareService from '@api/services/share';

import IconSVG from '@components/atoms/IconSVG';
import { Container, ContainerItem, HandleCheck, HandleDrag } from './style';

function ContentCardList(
  {
    list,
    configurable,
    isOrganize,
    onSelect,
    onDeleteContent,
    onSortEndCb,
    selectOnlyOne,
    isPitch,
  },
  ref,
) {
  const [privateData, setPrivateData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const { state: profileState } = useContext(ProfileContext);
  const { dispatch: appDispatch } = useContext(AppContext);

  const { id: profileId, previewMode } = profileState;

  const router = useRouter();
  const toast = useToast();
  const showToast = msg => toast.add(msg, 'error');

  const { slug } = router.query;

  function openEditPage(type, id) {
    router.push(
      `/library/post/edit/${type === 'media' ? 'video' : type}/${id}`,
    );
  }

  function onShareLink(data) {
    appDispatch({
      type: 'SET_MODAL_OPENED',
      component: PortfolioLinkModal,
      props: {
        data,
        privateData: profileState.share || privateData,
        showClose: true,
      },
    });
  }

  async function getPrivateLink() {
    try {
      const privateResponse = await ShareService.createShare(profileState.id);
      const { data: privData } = privateResponse.data;
      setPrivateData(privData);
    } catch (error) {
      showToast(errorHandle(error));
    }
  }

  async function toggleCheck(id) {
    if (selectOnlyOne) {
      setSelectedItems({ [id]: true });

      return;
    }

    setSelectedItems(state => {
      if (!state[id]) {
        return {
          ...state,
          [id]: true,
        };
      }

      return {
        ...state,
        [id]: !state[id],
      };
    });
  }

  function handleClickCard(id) {
    if (isOrganize) return null;

    if (configurable) {
      return toggleCheck(id);
    }

    return router.push(
      previewMode ? `/view/${slug}/post/${id}` : `/library/post/${id}`,
    );
  }

  useEffect(() => {
    console.log('selectedItems', selectedItems);
    console.log('onSelect', onSelect);
    if (onSelect) onSelect(selectedItems);
  }, [selectedItems, onSelect]);

  useImperativeHandle(ref, () => ({
    selectAllItems: () => {
      if (selectOnlyOne) return;

      const allSelectedItems = list
        .map(content => content.id)
        .reduce(
          (acc, idValue) => ({
            ...acc,
            [idValue]: true,
          }),
          {},
        );

      setSelectedItems(allSelectedItems);
      onSelect(allSelectedItems);
    },
    deselectAllItems: () => {
      setSelectedItems({});
      onSelect({});
    },
    selectSpecificItems: itemIdsToSelect => {
      const itemsToSelect = itemIdsToSelect
        .map(id => id)
        .reduce(
          (acc, idValue) => ({
            ...acc,
            [idValue]: true,
          }),
          {},
        );

      setSelectedItems(itemsToSelect);
      onSelect(itemsToSelect);
    },
  }));

  const SortableItem = SortableElement(({ value }) => (
    <ContainerItem
      key={value.id}
      aria-hidden="true"
      onClick={() => handleClickCard(value.id)}
    >
      {configurable && (
        <HandleCheck isSelect={selectedItems[value.id]}>
          <IconSVG name="checkStroke" />
        </HandleCheck>
      )}
      {isOrganize && (
        <HandleDrag isSelect={selectedItems[value.id]}>
          <IconSVG name="move" size={16} />
        </HandleDrag>
      )}
      <PostCard
        image={isPitch ? getCoverImage(value) : getThumbPortfolio(value)}
        title={value.title}
        desc={value.description}
        created={value.createdAt}
        tags={value.tags !== null ? value.tags : []}
        showOptions={!previewMode && !configurable && !isOrganize}
        onDelete={() => onDeleteContent({ id: value.id, type: value.status })}
        onEdit={() => openEditPage(value.type, value.id)}
        onShare={() => onShareLink(value)}
        type={value.type}
        data={value}
        thumbCover={value.type === 'link' && YOUTUBE_REGEX.test(value.link.url)}
        noAnalytics={previewMode}
        isFull
      />
    </ContainerItem>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <Container className="addPitchModalList">
      {items.map((value, index) => (
        <SortableItem
          disabled={!isOrganize}
          key={value.id}
          index={index}
          value={value}
        />
      ))}
    </Container>
  ));

  useEffect(() => {
    if (profileId && !previewMode) {
      getPrivateLink();
    }
  }, [profileState]);

  function handleOnSortEnd(dragData) {
    if (!isOrganize) return;

    onSortEndCb(dragData);
  }

  return <SortableList items={list} onSortEnd={handleOnSortEnd} axis="xy" />;
}

ContentCardList.propTypes = {
  isOrganize: PropTypes.bool,
  onSortEndCb: PropTypes.func,
  configurable: PropTypes.bool,
  onSelect: PropTypes.func,
  onDeleteContent: PropTypes.func,
  selectOnlyOne: PropTypes.bool,
  isPitch: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      title: PropTypes.string,
      desc: PropTypes.string,
      created: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      onDelete: PropTypes.func,
      showOptions: PropTypes.bool,
      onEdit: PropTypes.func,
      isDraft: PropTypes.bool,
      onPublish: PropTypes.func,
      disabled: PropTypes.bool,
      type: PropTypes.oneOf(['blog', 'media', 'link', 'document', 'video']),
      popOverList: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
      data: PropTypes.objectOf(PropTypes.any),
      disableHover: PropTypes.bool,
      onShare: PropTypes.func,
      titleOnly: PropTypes.bool,
      thumbCover: PropTypes.bool,
      noFooter: PropTypes.bool,
      noAnalytics: PropTypes.bool,
    }),
  ),
};

ContentCardList.defaultProps = {
  list: [],
  configurable: false,
  isOrganize: false,
  selectOnlyOne: false,
  isPitch: false,
  onSortEndCb: () => null,
  onSelect: () => null,
  onDeleteContent: () => null,
};

export default forwardRef(ContentCardList);
