
interface Props {
    title: string
    close: () => void
    children: React.ReactNode
}
export default function ModalComponent({ title, close, children }: Props) {
    return <dialog id="my_modal_1" className="modal">
    <div className="modal-box border border-white/20">
      <h3 className="text-lg font-bold">{ title }</h3>
      {children}
      <div className="modal-action">
        <form method="dialog">
          <button onClick={close} className="btn btn-primary">Accept</button>
        </form>
      </div>
    </div>
  </dialog>;
}