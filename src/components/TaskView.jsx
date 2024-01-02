import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import TimeStampInput from "./TimeStampInput";
import IconButton from "./IconButton";

export default function TaskView({
  currentTask,
  deleteTask,
  updateTask,
  hideTaskView,
}) {
  const EMPTY = "";
  const [name, setName] = useState(EMPTY);
  const [desc, setDesc] = useState(EMPTY);
  const [dueDate, setDueDate] = useState(EMPTY);
  const [dueTime, setDueTime] = useState(EMPTY);

  //This re-renders the task view when the current task is changed
  useEffect(() => {
    setName(currentTask?.name || EMPTY);
    setDesc(currentTask?.desc || EMPTY);
    setDueDate(currentTask?.dueDate || EMPTY);
    setDueTime(currentTask?.dueTime || EMPTY);
  }, [currentTask]);

  //template for modified task
  let modifiedTask = {
    id: currentTask?.id,
    name: name,
    desc: desc,
    dueDate: dueDate,
    dueTime: dueTime,
  };

  return (
    <div className="px-5 min-h-screen md:min-h-full absolute inset-0 z-30 md:relative  lg:w-[425px] py-7 md:rounded-2xl bg-secondary">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task:</h1>
        <IconButton iconType="close" onClickAction={hideTaskView} />
      </header>

      <div className="flex flex-col pt-8 gap-y-5">
        <input
          className="p-3 transition-colors bg-transparent border rounded-md border-zinc-200 outline-primary hover:border-primary"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="p-3 transition-colors bg-transparent border rounded-md min-h-32 max-h-96 border-zinc-200 outline-primary hover:border-primary"
          placeholder="Description"
          value={desc}
          cols={3}
          rows={9}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TimeStampInput
          label="Due Date"
          type="date"
          value={dueDate}
          onChangeAction={(e) => setDueDate(e.target.value)}
        />
        <TimeStampInput
          label="Due Time"
          type="time"
          value={dueTime}
          onChangeAction={(e) => setDueTime(e.target.value)}
        />

        <div className="absolute inset-x-0 flex px-5 justify-evenly bottom-7 gap-x-7">
          <ActionButton
            bgColorStyle="bg-transparent"
            label="Delete"
            onClickAction={() => deleteTask(currentTask?.id)}
          />
          <ActionButton
            bgColorStyle="bg-primary"
            label="Save"
            onClickAction={() =>  updateTask(modifiedTask)}
          />
        </div>
      </div>
    </div>
  );
}
