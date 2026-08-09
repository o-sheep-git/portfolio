import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "当サイトにおけるアクセス解析やお問い合わせ情報の取り扱いについて説明しています。",
};

const linkClass =
  "text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mt-6 leading-loose text-neutral-600">
        当サイトにおける、アクセス情報およびお問い合わせでお預かりした情報の取り扱いについて説明します。
      </p>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">アクセス解析について</h2>
        <div className="mt-6 space-y-4 leading-loose text-neutral-600">
          <p>
            当サイトでは、サイトの利用状況を把握するために、Googleが提供するアクセス解析ツール「Googleアナリティクス(GA4)」および「Googleタグマネージャー」を使用しています。
          </p>
          <p>
            これらのツールは、Cookieを使用して閲覧情報を収集します。収集されるのは、閲覧されたページ、サイト内での移動、おおまかな地域、利用しているブラウザや端末の種類などで、氏名や住所といった個人を特定できる情報は含まれません。
          </p>
          <p>
            収集した情報は、サイトの内容や構成を見直す目的にのみ使用し、第三者に提供することはありません。
          </p>
          <p>
            Cookieの使用を希望されない場合は、ご利用のブラウザの設定から無効にできます。Googleが提供するオプトアウト アドオンを利用する方法もあります。
          </p>
        </div>
        <ul className="mt-6 space-y-3 leading-loose text-neutral-600">
          <li>
            ・
            <a
              href="https://tools.google.com/dlpage/gaoptout?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Googleアナリティクス オプトアウト アドオン ↗
            </a>
          </li>
          <li>
            ・
            <a
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Googleのプライバシーポリシー ↗
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">お問い合わせについて</h2>
        <div className="mt-6 space-y-4 leading-loose text-neutral-600">
          <p>
            当サイトにはお問い合わせフォームを設置していません。お仕事のご相談やご連絡は、noteおよびXを通じていただいています。
          </p>
          <p>
            やり取りの中でお預かりした情報は、ご連絡への対応の目的にのみ使用し、ご本人の同意なく第三者に開示することはありません。なお、各サービス上での情報の取り扱いについては、それぞれのサービスのプライバシーポリシーをご確認ください。
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">免責事項</h2>
        <div className="mt-6 space-y-4 leading-loose text-neutral-600">
          <p>
            当サイトに掲載している情報は、正確であるよう努めていますが、その内容を保証するものではありません。掲載内容を利用して生じた損害について、責任を負いかねますのでご了承ください。
          </p>
          <p>
            当サイトからリンクしている外部サイトについて、リンク先で提供される情報やサービスには責任を負いません。
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">本ポリシーの変更について</h2>
        <p className="mt-6 leading-loose text-neutral-600">
          本ポリシーの内容は、必要に応じて見直し、変更する場合があります。変更後の内容は、このページに掲載した時点から適用されます。
        </p>
        <p className="mt-8 text-sm text-neutral-500">制定日: 2026年8月9日</p>
      </section>
    </div>
  );
}
