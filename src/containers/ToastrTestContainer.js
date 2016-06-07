import React, {Component, dangerouslySetInnerHTML}  from 'react'
import {toastr} from 'react-redux-toastr'

import loremIpsum from 'lorem-ipsum';

class comp extends Component {
  render() {
    return (
        <h2>hej</h2>
    );
  }
}

class messageComp extends Component {
  render() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae aliquam lacus. Donec a egestas mauris. Quisque et luctus nisi, vel placerat est.<br/><br/> Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus tincidunt ullamcorper eros, nec tincidunt sapien ultrices in. Vestibulum sed blandit mi. Pellentesque augue tellus, bibendum id nulla vitae, consequat bibendum purus. Cras varius tellus a convallis finibus. Praesent sem risus, tristique at suscipit a, mattis id orci. Vestibulum interdum ligula sit amet ex lobortis, ac maximus ipsum vestibulum. Donec suscipit viverra nisl placerat imperdiet. Aliquam pulvinar ut orci id pharetra. Quisque tristique augue a dui efficitur ornare. Aenean tincidunt eget sem ut pulvinar. Quisque at ligula rhoncus, congue justo et, sagittis ex. Pellentesque sapien magna, porta ut pulvinar a, venenatis at turpis.Aenean ut mi a odio hendrerit<br/><br/> laoreet. Morbi convallis, massa et tristique tempus, risus eros rhoncus turpis, vel accumsan velit purus nec urna. Curabitur varius molestie orci nec cursus. Curabitur pretium erat feugiat tortor imperdiet hendrerit. Curabitur condimentum cursus dui sit amet vestibulum. Nunc pretium iaculis est vel dignissim. Fusce et enim tempor, laoreet lacus in, hendrerit lectus. Sed sagittis sollicitudin condimentum. Curabitur fermentum dui at congue vehicula. Fusce vel risus sed lectus egestas ullamcorper. Morbi vel mauris erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/><br/> Duis vitae aliquam lacus. Donec a egestas mauris. Quisque et luctus nisi, vel placerat est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus tincidunt ullamcorper eros, nec tincidunt sapien ultrices in. Vestibulum sed blandit mi. Pellentesque augue tellus, bibendum id nulla vitae, consequat bibendum purus. Cras varius tellus a convallis finibus. Praesent sem risus, tristique at suscipit a, mattis id orci. Vestibulum interdum ligula sit amet ex lobortis, ac maximus ipsum vestibulum. Donec suscipit viverra nisl placerat imperdiet.<br/><br/> Aliquam pulvinar ut orci id pharetra. Quisque tristique augue a dui efficitur ornare. Aenean tincidunt eget sem ut pulvinar. Quisque at ligula rhoncus, congue justo et, sagittis ex. Pellentesque sapien magna, porta ut pulvinar a, venenatis at turpis.Aenean ut mi a odio hendrerit laoreet. Morbi convallis, massa et tristique tempus, risus eros rhoncus turpis, vel accumsan velit purus nec urna.<br/><br/> Curabitur varius molestie orci nec cursus. Curabitur pretium erat feugiat tortor imperdiet hendrerit. Curabitur condimentum cursus dui sit amet vestibulum. Nunc pretium iaculis est vel dignissim. Fusce et enim tempor, laoreet lacus in, hendrerit lectus. Sed sagittis sollicitudin condimentum. Curabitur fermentum dui at congue vehicula. Fusce vel risus sed lectus egestas ullamcorper. Morbi vel mauris erat';
    return <div dangerouslySetInnerHTML={{__html: text}} />;
  }
}

export default class ToastrTestContainer extends Component {
  add() {
    toastr.success('success', loremIpsum());
  }

  render() {
    return (
      <div class="container-fluid"> <button type="button" class="btn btn-success" onClick={this.add.bind(this)}>success</button>{' '}
            <button type="button" class="btn btn-primary" onClick={() => toastr.info('## Info', loremIpsum())}>info</button>{' '}
            <button type="button" class="btn btn-danger" onClick={() => toastr.error('## Error', {timeOut: 4000, component: comp})}>error</button>{' '}
            <button type="button" class="btn btn-warning" onClick={() => toastr.warning('## Warning', loremIpsum())}>warning</button>{' '}
            <button type="button" class="btn btn-default" onClick={() => toastr.message('## Message', {component: messageComp})}>message</button>{' '}
            <button type="button" class="btn btn-default" onClick={() => toastr.confirm('## confirm')}>confirm</button>{' '}
            <button type="button" class="btn btn-danger" onClick={() => toastr.clean()}>Clean</button>
      </div>
    )
  }
}
