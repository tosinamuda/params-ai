import Hero from "@/features/Home/components/Hero";
import { Footer } from "@/layouts/Footer";
import Header from "@/layouts/Header";

const TaskLandingPage = () => {
  return (
    <>
      <Header />
      <Hero showCTA={false} />
      <section className="h-16 bg-primary-300"></section>
      <div className="my-8">
        <section className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Task 1
              </h3>
              <p className="text-sm text-muted-foreground">
                Preview of the form created by <a href="#">User 1</a>
              </p>
            </div>
            <div className="p-6">
              <img
                src="/placeholder.svg"
                alt="Form preview"
                className="w-full object-cover rounded-lg"
                width="200"
                height="200"
                style={{ aspectRatio: "200 / 200", objectFit: "cover" }}
              />
            </div>
            <div className="p-6 flex justify-between items-center">
              <div className="space-x-2">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  View Form
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                  Edit Form
                </button>
              </div>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  U1
                </span>
              </span>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Task 2
              </h3>
              <p className="text-sm text-muted-foreground">
                Preview of the form created by <a href="#">User 2</a>
              </p>
            </div>
            <div className="p-6">
              <img
                src="/placeholder.svg"
                alt="Form preview"
                className="w-full object-cover rounded-lg"
                width="200"
                height="200"
                style={{ aspectRatio: "200 / 200", objectFit: "cover" }}
              />
            </div>
            <div className="p-6 flex justify-between items-center">
              <div className="space-x-2">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  View Form
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                  Edit Form
                </button>
              </div>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  U2
                </span>
              </span>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Task 3
              </h3>
              <p className="text-sm text-muted-foreground">
                Preview of the form created by <a href="#">User 3</a>
              </p>
            </div>
            <div className="p-6">
              <img
                src="/placeholder.svg"
                alt="Form preview"
                className="w-full object-cover rounded-lg"
                width="200"
                height="200"
                style={{ aspectRatio: "200 / 200", objectFit: "cover" }}
              />
            </div>
            <div className="p-6 flex justify-between items-center">
              <div className="space-x-2">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  View Form
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                  Edit Form
                </button>
              </div>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  U3
                </span>
              </span>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};
export default TaskLandingPage;
