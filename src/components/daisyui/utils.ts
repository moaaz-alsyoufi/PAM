// utils.ts
import {
  cloneElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface BaseProps {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

interface WrapperProps extends BaseProps {
  onClick?: () => void;
}

export const wrapElement = ({
  node,
  wrapper,
  props = {},
}: {
  node: ReactNode;
  wrapper: ReactElement<any>;
  props?: WrapperProps;
}): ReactElement => {
  if (!node) {
    return cloneElement(wrapper, props);
  }

  if (!isValidElement(node)) {
    return cloneElement(wrapper, props, node);
  }

  const nodeElement = node as ReactElement<BaseProps>;

  if (isReactFragment(nodeElement)) {
    return cloneElement(
      wrapper,
      {
        ...props,
        className: twMerge(
          nodeElement.props?.className,
          props.className
        ),
      },
      nodeElement.props.children
    );
  }

  return cloneElement(
    nodeElement,
    {
      ...props,
      className: twMerge(
        nodeElement.props?.className,
        props.className
      ),
    },
    nodeElement.props.children
  );
};

function isReactFragment(node: ReactElement): boolean {
  return node.type === Fragment;
}

// Utility function (if needed)
export const isSingleStringChild = (children: ReactNode): boolean => {
  return typeof children === 'string';
};