import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig, type DefaultTheme } from 'vitepress';

// https://vitepress.dev/reference/site-config
const siteUrl = 'localhost';

export default defineConfig({
  lang: 'ko-KR',
  base: '/react-video-thumbnail-extractor',
  title: 'Sky UI - React 동영상 썸네일 추출기',
  description: 'React Video Thumbnail Extractor - Sky UI Components',
  appearance: 'force-dark',
  ignoreDeadLinks: [/^https?:\/\/localhost/],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    nav: [
      { text: '☺️ 가이드', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '⭐️ 예제 모음', link: '/examples/react-quill-basic', activeMatch: '/examples/' }
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/examples/': { base: '/examples/', items: sidebarExamples() }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/haneulcho' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/haneul-fe/' }
    ],
    footer: {
      copyright: 'Copyright © 2024-present Haneul Cho'
    },
    docFooter: {
      prev: '이전',
      next: '다음'
    },
    outline: {
      label: '이 페이지 목차'
    },
    lastUpdated: {
      text: '업데이트 날짜'
    },
    returnToTopLabel: '맨 위로 돌아가기',
    sidebarMenuLabel: '사이드바 메뉴'
  },
  vite: {
    plugins: [
      mkcert({
        hosts: [siteUrl],
        savePath: resolve(__dirname, '../../vite-mkcert'),
        keyFileName: `${siteUrl}-key.pem`,
        certFileName: `${siteUrl}-cert.pem`
      })
    ],
    server: {
      port: 3033,
      host: 'localhost',
      open: true
    }
  }
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '소개',
      collapsed: false,
      items: [
        {
          text: 'Video Thumbnail Extractor?',
          link: 'introduction'
        },
        {
          text: '시작하기',
          link: 'getting-started'
        }
      ]
    },
    {
      text: '더 나아가기',
      collapsed: false,
      items: [
        {
          text: '커스텀 훅 만들기',
          link: 'custom-hook'
        },
        {
          text: '메시지 활용하기',
          link: 'message-handling'
        }
      ]
    },
    {
      text: 'API Reference',
      link: 'api-reference'
    }
  ];
}

function sidebarExamples(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'React Quill',
      collapsed: false,
      items: [
        {
          text: '외부 버튼 활용하기',
          link: 'react-quill-basic'
        },
        {
          text: 'Toolbar에 연동하기',
          link: 'react-quill-advanced'
        }
      ]
    }
  ];
}
