import React from 'react';
import Loadable from 'react-loadable';

import Loading from 'app/components/Loading';
import { Preferences, Module, Directory } from 'common/types';

import isImage from 'is-image';

import Monaco from './Monaco';
import ImageViewer from './ImageViewer';

type Props = {
  preferences: Preferences,
  id: string,
  modules: Array<Module>,
  directories: Array<Directory>,
};

const CodeMirror = Loadable({
  loader: () => import(/* webpackChunkName: 'codemirror' */ './CodeMirror'),
  LoadingComponent: Loading,
});

export default (props: Props) => {
  const module = props.modules.find(m => m.id === props.id);

  if (module) {
    if (module.isBinary) {
      if (isImage(module.title)) {
        return <ImageViewer code={module.code} title={module.title} />;
      }
    }
  }

  // We are phasing towards Monaco, the only thing missing is vim mode. So use
  // CodeMirror until we have proper support
  if (props.preferences.vimMode || props.preferences.codeMirror) {
    return <CodeMirror {...props} />;
  }

  return <Monaco {...props} />;
};
