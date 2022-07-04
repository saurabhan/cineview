import React from 'react'
import { Modal, Button, Input, Checkbox } from '@nextui-org/react'
import { useList } from '../utils/List-context'
import { Movie } from '../typings'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { useAuth } from '../utils/AuthContext'
import toast from 'react-hot-toast'

interface Props {
  movie: Movie
}

const PlaylistModal = (props: Props) => {
  const { movie } = props
  const { user } = useAuth()
  const { createList, playlist, addtolist } = useList()
  const [selected, setSelected] = React.useState<string[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const [visible, setVisible] = React.useState(false)

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    inputValue: string
  ) => {
    e.preventDefault()
    createList(inputValue)
    setInputValue('')
  }
  const list =
    playlist &&
    Object.keys(playlist).filter((key) =>
      // @ts-ignore
      playlist[key as keyof typeof playlist].find(
        (m: Movie) => m.id === movie?.id
      )
    )

  const handler = () => {
    if (user) {
      setVisible(true)
      setSelected(list)
    } else {
      toast.error('Please login to add to list', {
        duration: 3000,
        position: 'bottom-center',
      })
    }
  }

  const listHandler = (value: string) => {
    addtolist(movie, value)
  }

  const closeHandler = () => {
    setVisible(false)
  }
  return (
    <div>
      <PlusCircleIcon
        className="h-7 w-7 cursor-pointer"
        onClick={handler}
      ></PlusCircleIcon>
      <Modal closeButton open={visible} onClose={closeHandler}>
        <Modal.Header>
          <h1 className="text-2xl">Add to Playlist</h1>
        </Modal.Header>
        <Modal.Body>
          <Checkbox.Group
            color="warning"
            value={selected}
            onChange={setSelected}
          >
            {playlist &&
              Object.keys(playlist).map((item, index) => {
                return (
                  <Checkbox
                    onChange={(e) => listHandler(item)}
                    key={index}
                    value={item}
                  >
                    {item}
                  </Checkbox>
                )
              })}
          </Checkbox.Group>
          <Input
            placeholder="Enter playlist name"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            className="bg-brandamber"
            onClick={(e) => clickHandler(e, inputValue)}
          >
            Create new Playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PlaylistModal
