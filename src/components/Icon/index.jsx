import { ReactComponent as arrowLeft } from './svgs/arrow-left.svg'
import { ReactComponent as arrowRight } from './svgs/arrow-right.svg'
import { ReactComponent as back } from './svgs/back.svg'
import { ReactComponent as checkout} from './svgs/checkout.svg'
import { ReactComponent as profile } from './svgs/profile.svg'
import { Form } from 'formik'

const icons = {
    arrowLeft,
    arrowRight,
    back,
    checkout,
    profile
}

export const Icon = ({name, ...props }) => {
    const Element = icons[name]
    return <Element {...props} />
}