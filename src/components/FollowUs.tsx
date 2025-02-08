import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
  facebookProfileUrl,
  twitterProfileUrl,
  whatsAppCommunityProfileUrl,
  linkedInProfileUrl,
  instagramProfileUrl,
} from '../utils/constants';

const FollowUs = () => (
  <div className="my-6 flex flex-col items-center gap-4">
    <span>Follow us on</span>
    <div className="flex items-center justify-center gap-10 text-2xl">
      <a href={facebookProfileUrl} target="_blank">
        <FaFacebook fill="#316FF6" />
      </a>
      <a href={twitterProfileUrl} target="_blank">
        <FaTwitter fill="#00ACED" />
      </a>
      <a href={whatsAppCommunityProfileUrl} target="_blank">
        <FaWhatsapp fill="#25D366" />
      </a>
      <a href={linkedInProfileUrl} target="_blank">
        <FaLinkedin fill="#007FB1" />
      </a>
      <a href={instagramProfileUrl} target="_blank">
        <FaInstagram fill="#bc2a8d" />
      </a>
    </div>
  </div>
);

export default FollowUs;
