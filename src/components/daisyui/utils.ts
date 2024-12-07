import { cloneElement, Fragment, isValidElement, ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BaseProps {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

interface WrapperProps extends BaseProps {
  onClick?: () => void;
}

interface ReactElementWithProps extends ReactElement {
  props: BaseProps;
}

export const wrapElement = ({
  node,
  wrapper,
  props = {},
}: {
  node: ReactNode;
  wrapper: ReactElement;
  props?: WrapperProps;
}) => {
  if (!node) {
    return cloneElement<BaseProps>(wrapper, props);
  }

  if (!isValidElement(node)) {
    return cloneElement<BaseProps>(wrapper, props, node);
  }

  const nodeElement = node as ReactElementWithProps;

  if (isReactFragment(nodeElement)) {
    return cloneElement<BaseProps>(
      wrapper,
      {
        ...props,
        className: twMerge(nodeElement.props?.className, props?.className),
      },
      nodeElement.props.children,
    );
  }

  return cloneElement<BaseProps>(nodeElement, {
    ...props,
    className: twMerge(nodeElement.props?.className, props?.className),
  });
};

export const isReactFragment = (node: ReactElement): boolean => {
  return node.type === Fragment || node.type?.toString() === 'Symbol(react.fragment)';
};