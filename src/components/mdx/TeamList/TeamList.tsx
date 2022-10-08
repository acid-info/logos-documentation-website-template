import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import { useTeam } from '@site/src/lib/team.utils'
import { ELogosTeamNames } from '@site/src/types/team'
import { IconDiscord, IconGithub, IconStatus } from '../../Icon'
import { SocialMediaItem } from '../../Icon/SocialmediaLink'

type TProps = {
  children: React.ReactNode
}

export const TeamList = ({ children }: TProps): JSX.Element => {
  const team = useTeam('codex' as ELogosTeamNames)

  return (
    <section className={styles.TeamList}>
      <div className={styles.TeamListContainer}>
        {team.map((member, index) => (
          <div className={clsx('', styles.memberCard)}>
            <div className={clsx('', styles.memberCardImage)}>
              <img
                src={member['photo-path']}
                alt={member['pref-name']}
                title={member.contact.email}
              />
            </div>
            <div className={clsx('card', styles.memberCardCaption)}>
              <div>
                <h5>{member['pref-name']}</h5>
                <small className={styles.memberEmail}>
                  {member.contact.email}
                </small>
              </div>
              <div className={styles.memberSocials}>
                {member.contact.github && (
                  <SocialMediaItem
                    handler={member.contact.github}
                    provider={'github'}
                  />
                )}
                {member.contact.status && (
                  <SocialMediaItem
                    handler={member.contact.status}
                    provider={'status'}
                  />
                )}
                {member.contact.discord && (
                  <SocialMediaItem
                    handler={member.contact.discord}
                    provider={'discord'}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
