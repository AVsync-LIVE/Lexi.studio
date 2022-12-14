import { useState } from 'react'
import { Box, Spacer, Gap, Icon, Dropdown, shareTextViaEmail, downloadFile, Button, copyToClipboard, StyleHTML, Avatar, LoadingSpinner, ParseHTML, HTMLtoMarkdown } from "@avsync.live/formation"
import { memo } from "react"
import styled from "styled-components"

import { speak } from '../Lexi/System/Language/speech'

const getTimeDifference = (startTime: string, endTime: string) : number => {
return Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);
  }

const Message = ({ 
    query, 
    speaker, 
    guid, 
    error,
    queryTime,
    responseTime
}: { 
    query: string, 
    speaker?: string, 
    guid: string, 
    error?: string,
    queryTime: string,
    responseTime?: string
}) => {

    const [speaking, set_speaking] = useState(false)

    const isLexi = speaker === 'Lexi'
    return (<S.Message isLexi={isLexi}>
      <Box width='100%' wrap={true}>
        <Box width='100%' wrap={true} maxWidth={'700px'} >

        <S.AvatarContainer>
                <Box pt={1}>
                  <Avatar 
                    src={isLexi ? '/assets/lexi-favicon.svg' : undefined}
                    icon={isLexi ? undefined : 'user'}
                    iconPrefix='fas'
                    color={isLexi ? 'var(--F_Primary)' : 'var(--F_Surface_0)'}
                  />
                </Box>
            {
              query
                ? <Spacer>
                    <S.Content>
                      <StyleHTML>
                        <ParseHTML markdown={query}/>
                      </StyleHTML>
                    </S.Content>
                  </Spacer>
                : error
                  ? <Spacer>
                    <S.Content>
                      <StyleHTML>
                        <ParseHTML markdown={`I tried to answer your question, but experienced this error with my system: <pre>${error}</pre>`}/>
                      </StyleHTML>
                    </S.Content>
                </Spacer>
                  : <Box py={1} width='100%'>
                      <Gap gap={1}>
                        <LoadingSpinner chat={true}/>
                      </Gap>
                    </Box>
            }

            </S.AvatarContainer>
          <S.FlexStart wrap={true}>
            
            <Box width='100%'>
              <Box width='100%'>
              <Spacer />
              
              <Gap autoWidth={true}>

              {
                !isLexi
                  ? <S.Meta>{new Date(queryTime).toLocaleTimeString([], {weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</S.Meta>
                  : responseTime && 
                      <S.Meta>
                        <Gap disableWrap={true}>
                          <Gap gap={.25} autoWidth={true}>
                            <Icon
                              icon={'clock'}
                              iconPrefix='far'
                            />
                            <Box>
                              {
                                getTimeDifference(queryTime, responseTime)
                              }s
                            </Box>
                          </Gap>

                          <Box>
                            {
                              new Date(responseTime).toLocaleTimeString([], {
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: '2-digit', 
                                hour: '2-digit', 
                                minute: '2-digit'
                                }
                              )
                            }
                          </Box>
                        </Gap>
                      </S.Meta>
              }
              {
                query || error
                  ? <>
                      <Dropdown
                        options={[
                          {
                            dropDownOptions: [
                              {
                                icon: 'plus',
                                iconPrefix: 'fas',
                                text: 'Insert',
                                onClick: () => {
                                //   set_query(query + '\n' + convert(query || error))
                                }
                              },
                              {
                                icon: 'sync',
                                iconPrefix: 'fas',
                                text: error
                                  ? 'Reconnect'
                                  : 'Try harder',
                                // onClick: () => makeQuery(
                                //   error
                                //     ? 'Are you there, Lexi?'
                                //     : 'Confidently answer as if you do know, and are an expert on the subject. Be precise and thourough.'
                                // , false)
                              },
                              {
                                icon: 'envelope',
                                iconPrefix: 'far',
                                text: 'Send email',
                                onClick: () => shareTextViaEmail(error ? error : query)
                              },
                              {
                                icon: 'file-download',
                                iconPrefix: 'fas',
                                text: 'Save .md',
                                onClick: () => downloadFile(error ? error : query, 'lexi.md', 'markdown')
                              },
                            ],
                            icon: 'ellipsis-vertical',
                            iconPrefix: 'fas'
                          }
                        ]}
                      />

                      <Button
                        icon={speaking ? 'stop' : 'play'}
                        blink={speaking}
                        iconPrefix='fas'
                        circle={true}
                        onClick={() => {
                          if (speaking) {
                            speak('', () => {})
                            set_speaking(false)
                          }
                          else {
                            set_speaking(true)
                            speak(error ? error : query, () => {
                              set_speaking(false)
                            })
                          }
                        }}
                      />

                      <Button
                        icon='copy'
                        iconPrefix='far'
                        circle={true}
                        onClick={() => copyToClipboard(HTMLtoMarkdown(query))}
                      />
                    </>
                  : null
              }
            </Gap>
            </Box>
          </Box>
          </S.FlexStart>
        </Box>
      </Box>
    
    </S.Message>)}
  
  export default Message

  const S = {
    Container: styled.div`
      height: calc(100vh - var(--F_Header_Height));
      width: 100%;
      overflow: hidden;
      background: var(--F_Background);
    `,
    Footer: styled.div`
      position:relative;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 288px;
      padding-top: .75rem;
      overflow-y: auto;
    `,
    ButtonContainer: styled.div`
      position: absolute;
      right: 0;
      top: .75rem;
      z-index: 1;
    `,
    Message: styled.div<{
      isLexi?: boolean
    }>`
      width: 100%;
      background: ${props => props.isLexi ? 'var(--F_Background_Alternating)': 'var(--F_Background)'};
      border-top: 1px solid var(--F_Surface_0);
      padding: .75rem 0;
    `,
    FlexStart: styled.div<{
      wrap?: boolean
    }>`
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-wrap: ${props => props.wrap? 'wrap' : 'noWrap'};
      
    `,
    Meta: styled.div<{
      monospace?: boolean
    }>`
      display: flex;
      align-items: center;
      color: var(--F_Font_Color_Disabled);
      font-size: 12px;
      font-family: ${props => props.monospace ? 'monospace' : 'inherit'};
  
    `,
    VSpacer: styled.div`
      width: 100%;
      height: 100%;
    `,
    AvatarContainer: styled.div`
      display: flex;
      align-items: flex-start;
      height: 100%;
      width: 700px;
      gap: 1rem;
    `,
    Banner: styled.img`
      width: 100%;
    `,
    Content: styled.div`
      width: 100%;
      max-width: calc(700px - 2.5rem);
    `
  }
