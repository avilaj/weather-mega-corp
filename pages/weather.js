import {withRouter} from 'next/router';
import Link from 'next/link'

const NiceLink = (props) => (
  <li>
    <Link as={`/${props.id}`} href={`/?city=${props.id}`}>
      <a>{props.city}</a>
    </Link>
  </li>
);

const Page = withRouter((props) => (
    <div>
        <h1>{props.router.query.city}</h1>
        <p>This is the blog post content.</p>
        <h3>Weather in other cities</h3>
        <Cities />
    </div>
))

export default Page