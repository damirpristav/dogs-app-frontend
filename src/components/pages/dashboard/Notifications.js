import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dateFormat from 'dateformat';

import Loader from '../../common/Loader';
import Popup from '../../common/Popup';

import { getAllNotifications, markNotificationAsSeen } from '../../../store/actions/notificationActions';

const Notifications = () => {
  const [notification, setNotification] = useState(null);
  const notifications = useSelector(state => state.notification.notifications);
  const loading = useSelector(state => state.notification.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const openPopup = notification => {
    setNotification(notification);
  }

  const onOkHandler = () => {
    if(!notification.seen){
      dispatch(markNotificationAsSeen(notification._id));
    }
    setNotification(null);
  }

  let popupContent = null;
  if(notification) {
    popupContent = (
      <div>
        <div style={{marginBottom: '10px'}}>{dateFormat(notification.createdAt, 'dd.mm.yyyy @ HH:MM:ss')}</div>
        <div>{notification.message}</div>
      </div>
    );
  }

  return (
    <div>
      <h3>Notifications</h3>
      <div className="u-relative">
        { loading && notifications.length === 0 && <Loader /> }
        { notifications.length > 0 ?
          <div className="c-table">
            <div className="c-table__row c-table__row--head">
              <div className="c-table__cell">Notification</div>
              <div className="c-table__cell">Date</div>
            </div>
            { notifications.map(notification => (
              <div className="c-table__row" key={notification._id}>
                <div className="c-table__cell" data-title="Notification:" onClick={() => openPopup(notification)}>
                  {!notification.seen && <span className="u-dot u-dot--red"></span>}
                  {notification.subject}
                </div>
                <div className="c-table__cell" data-title="Date:">
                  {dateFormat(notification.createdAt, 'dd.mm.yyyy @ HH:MM:ss')}
                </div>
              </div>
            ))}
          </div>
          : <p>No notifications!</p>
        }
      </div>

      {notification && <Popup 
        title={notification.subject}
        message={popupContent}
        hideCancel
        onOk={onOkHandler}
        onCancel={onOkHandler}
      />
      }
    </div>
  )
}

export default Notifications;