import React, { FC } from 'react';

import { Icon, IconName } from '@grafana/ui';

export interface FooterLink {
  text: string;
  icon?: string;
  url?: string;
  target?: string;
}

export let getFooterLinks = (): FooterLink[] => {
  return [
    {
      text: 'Dokumentation',
      icon: 'document-info',
      url: 'https://doc.elmatic-align.de',
      target: '_blank',
    },
    {
      text: 'Support',
      icon: 'question-circle',
      url: 'https://support.elmatic-align.de',
      target: '_blank',
    },
    {
      text: 'Elmatic',
      icon: 'comments-alt',
      url: 'https://www.elmatic.de',
      target: '_blank',
    },
  ];
};

export let getVersionLinks = (): FooterLink[] => {
  const links: FooterLink[] = [];

  //links.push({ text: `${buildInfo.edition}${stateInfo}`, url: licenseInfo.licenseUrl });
  links.push({
    text: `Ausloggen`,
    url:
      'https://auth.elmatic-xenon.de/auth/realms/Xenon/protocol/openid-connect/logout?redirect_uri=http%3A%2F%2Fcloud.elmatic-xenon.de%2Flogin%2Fgeneric_oauth',
  });

  return links;
};

export function setFooterLinksFn(fn: typeof getFooterLinks) {
  getFooterLinks = fn;
}

export function setVersionLinkFn(fn: typeof getFooterLinks) {
  getVersionLinks = fn;
}

export const Footer: FC = React.memo(() => {
  const links = getFooterLinks().concat(getVersionLinks());

  return (
    <footer className="footer">
      <div className="text-center">
        <ul>
          {links.map((link) => (
            <li key={link.text}>
              <a href={link.url} target={link.target} rel="noopener">
                {link.icon && <Icon name={link.icon as IconName} />} {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
