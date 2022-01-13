import {Redirect, Route} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import AuthenticationPage from "../../pages/AuthenticationPage/index";
import {fetchCurrentUser, globalState} from "../../features/global/globalSlice";
import {useEffect} from "react";
import {isEmpty} from "lodash";

const PrivateRoute = ({component: Component, ...rest}) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(globalState);

  useEffect(() => {
    if (!currentUser && localStorage.getItem("authToken")) {
      dispatch(fetchCurrentUser());
    }
  }, [currentUser, dispatch]);

  const isAlreadyRegister =
    currentUser && !isEmpty(currentUser.email) && !isEmpty(currentUser.name);

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("authToken") ? (
          isAlreadyRegister ? (
            <Component {...props} />
          ) : (
            <AuthenticationPage register={true} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;