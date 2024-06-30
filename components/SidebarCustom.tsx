import * as React from "react";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { styled, alpha } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderRounded from "@mui/icons-material/FolderRounded";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view/useTreeItem2";
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import Link from "next/link";
import { PATH_URL } from "@/constants";



type FileType =
  | "image"
  | "pdf"
  | "doc"
  | "video"
  | "folder"
  | "pinned"
  | "trash";

type ExtendedTreeItemProps = {
  fileType?: FileType;
  id: string;
  label: string;
  to?: string;
};

const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: "1",
    label: "Favorites",

    children: [
      {
        id: "1.1",
        label: "Inbox",
        to: PATH_URL.MAIL_BOX,
        fileType: "folder",
      },
      { id: "1.2", label: "Sent Items", fileType: "folder", to: PATH_URL.SEND_EMAIL },
      { id: "1.3", label: "Drafts", fileType: "image", to: "/unknow" },
    ],
  },
  {
    id: "2",
    label: "Folders",
    fileType: "pinned",
    children: [
      {
        id: "2.1",
        label: "Learning materials",
        fileType: "folder",
        to: "/unknow",
      },
      { id: "2.2", label: "News", fileType: "folder", to: "/unknow" },
      { id: "2.3", label: "Forums", fileType: "folder", to: "/unknow" },
      { id: "2.4", label: "Travel documents", fileType: "pdf", to: "/unknow" },
    ],
  },
  { id: "3", label: "History", fileType: "folder", to: "unknow" },
  { id: "4", label: "Trash", fileType: "trash", to: PATH_URL.TRASH },
];

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "warning.main",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}
declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[400],
  position: "relative",
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
})) as unknown as typeof TreeItem2Root;

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: theme.spacing(2),
  },
  [`&.Mui-expanded `]: {
    "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
    {
      color:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.primary.dark,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: "18px",
      top: "44px",
      height: "calc(100% - 48px)",
      width: "1.5px",
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
    },
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color:
      theme.palette.mode === "light" ? theme.palette.primary.main : "white",
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse sx={{ paddingLeft: '30px' }} style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: "inherit",
  fontFamily: "General Sans",
  fontWeight: 500,
}) as unknown as typeof Typography;

interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
  expandable?: boolean;
}

function CustomLabel({
  icon: Icon,
  expandable,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "pdf":
      return PictureAsPdfIcon;
    case "doc":
      return ArticleIcon;
    case "video":
      return VideoCameraBackIcon;
    case "folder":
      return FolderRounded;
    case "pinned":
      return FolderOpenIcon;
    case "trash":
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
  Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> { }

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);
  let icon;
  if (expandable) {
    icon = FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <>
      {item.to ? <Link href={item.to}>
        <TreeItem2Provider itemId={itemId}>
          <StyledTreeItemRoot {...getRootProps(other)}>
            <CustomTreeItemContent
              {...getContentProps({
                className: clsx("content", {
                  "Mui-expanded": status.expanded,
                  "Mui-selected": status.selected,
                  "Mui-focused": status.focused,
                  "Mui-disabled": status.disabled,
                }),
              })}
            >
              <TreeItem2IconContainer {...getIconContainerProps()}>
                <TreeItem2Icon status={status} />
              </TreeItem2IconContainer>
              <TreeItem2Checkbox {...getCheckboxProps()} />
              <CustomLabel
                {...getLabelProps({
                  icon,
                  expandable: expandable && status.expanded,
                })}
              />
            </CustomTreeItemContent>
            {children && <TransitionComponent {...getGroupTransitionProps()} />}
          </StyledTreeItemRoot>
        </TreeItem2Provider>
      </Link> : <TreeItem2Provider itemId={itemId}>
        <StyledTreeItemRoot {...getRootProps(other)}>
          <CustomTreeItemContent
            {...getContentProps({
              className: clsx("content", {
                "Mui-expanded": status.expanded,
                "Mui-selected": status.selected,
                "Mui-focused": status.focused,
                "Mui-disabled": status.disabled,
              }),
            })}
          >
            <TreeItem2IconContainer {...getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </TreeItem2IconContainer>
            <TreeItem2Checkbox {...getCheckboxProps()} />
            <CustomLabel
              {...getLabelProps({
                icon,
                expandable: expandable && status.expanded,
              })}
            />
          </CustomTreeItemContent>
          {children && <TransitionComponent {...getGroupTransitionProps()} />}
        </StyledTreeItemRoot>
      </TreeItem2Provider>}
    </>
  );
});

export default function SidebarCustom() {
  return (
    <RichTreeView
      items={ITEMS}
      aria-label="file explorer"
      defaultExpandedItems={["1", "1.1"]}
      defaultSelectedItems="1.1"
      sx={{
        height: "fit-content",
        flexGrow: 1,
        maxWidth: 400,
        overflowY: "auto",
      }}
      slots={{ item: CustomTreeItem }}
    />
  );
}
