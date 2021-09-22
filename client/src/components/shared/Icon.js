import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faForward } from "@fortawesome/free-solid-svg-icons/faForward";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons/faDollarSign";
import { faFire } from "@fortawesome/free-solid-svg-icons/faFire";
import { faRegistered } from "@fortawesome/free-solid-svg-icons/faRegistered";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons/faCaretSquareDown";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faBoxTissue } from "@fortawesome/free-solid-svg-icons/faBoxTissue";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons/faSearchMinus";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons/faSearchPlus";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons/faLightbulb";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons/faHeartbeat";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons/faUnlockAlt";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faUserCog } from "@fortawesome/free-solid-svg-icons/faUserCog";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";

library.add(
    faForward,
    faQuestion,
    faSignInAlt,
    faEdit,
    faBars,
    faTimes,
    faChartLine,
    faBook,
    faUsers,
    faComments,
    faSearch,
    faTrash,
    faDollarSign,
    faFire,
    faRegistered,
    faPlus,
    faArrowLeft,
    faCaretSquareDown,
    faTags,
    faComment,
    faFlag,
    faBoxTissue,
    faSearchMinus,
    faSearchPlus,
    faReply,
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faLightbulb,
    faFilter,
    faHeartbeat,
    faUnlockAlt,
    faTrashAlt,
    faUserCircle,
    faExclamationTriangle,
    faUserCog,
    faCheckCircle,
    faInfoCircle,
    faEnvelope,
    faDice
);

const Icon = (props) => {
    return <FontAwesomeIcon {...props} />;
};

export default Icon;
